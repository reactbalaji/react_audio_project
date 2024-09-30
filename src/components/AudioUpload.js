import React, { useState, useRef } from 'react';
import axios from 'axios';
import { Box, Button, CircularProgress, Typography, IconButton } from '@mui/material';
import MicIcon from '@mui/icons-material/Mic';
import StopIcon from '@mui/icons-material/Stop';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import { audioUploadUrl } from '../config';
import { useNavigate } from 'react-router-dom';
import { CommonPopup } from './commonPopup';

const AudioUpload = () => {
    const navigate = useNavigate();
    const [recording, setRecording] = useState(false);
    const [audioUrl, setAudioUrl] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const mediaRecorderRef = useRef(null);
    const audioChunksRef = useRef([]);
    const audioRef = useRef(null);
    const [somethingWentWrongPopup, setSomethingWentWrongPopup] = useState({
        occurrence: "",
        popup: false,
        message: "",
        colorCode:"",
        title:""
      });


    const startRecording = async () => {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        mediaRecorderRef.current = new MediaRecorder(stream);
        audioChunksRef.current = [];

        mediaRecorderRef.current.ondataavailable = (event) => {
            audioChunksRef.current.push(event.data);
        };

        mediaRecorderRef.current.onstop = () => {
            const blob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
            const url = URL.createObjectURL(blob);
            setAudioUrl(url);
            uploadAudio(blob);  // Upload the audio after recording is stopped
        };

        mediaRecorderRef.current.start();
        setRecording(true);
    };

    const stopRecording = () => {
        mediaRecorderRef.current.stop();
        setRecording(false);
    };

    const handlePlayPause = () => {
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    const uploadAudio = async (blob) => {
        const formData = new FormData();
        formData.append('audio', blob, 'recording.wav');

        try {
            const response = await axios.post(audioUploadUrl, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            if(response.status === 200) {
                setSomethingWentWrongPopup({
                    occurrence: "",
                    popup: true,
                    message: 'Audio uploaded successfully!',
                    colorCode:"#558b2f",
                    title:"Information"
                  });
                console.log('Response:', response.data);
            }
            
        } catch (error) {
            setSomethingWentWrongPopup({
                occurrence: "",
                popup: true,
                message: 'Something went wrong',
                colorCode:"#d9534f",
                title:"Information"
              });
        }
    };

    const logoutFunction = () => {
        sessionStorage.setItem("token", "");
        navigate('/');
    }
    return (
        <Box display="flex" flexDirection="column" alignItems="center" mt={5}>
            <Typography variant="h4" gutterBottom>
                Audio Recorder
            </Typography>

            {/* Record/Stop Button */}
            <Box>
                {recording ? (
                    <IconButton color="secondary" onClick={stopRecording} size="large">
                        <StopIcon fontSize="large" />
                    </IconButton>
                ) : (
                    <IconButton color="primary" onClick={startRecording} size="large">
                        <MicIcon fontSize="large" />
                    </IconButton>
                )}
            </Box>

            {/* Recording Indicator */}
            {recording && (
                <Box mt={2}>
                    <CircularProgress />
                    <Typography variant="body1">Recording...</Typography>
                </Box>
            )}

            {/* Audio Playback */}
            {audioUrl && (
                <Box mt={4} display="flex" flexDirection="column" alignItems="center">
                    <audio ref={audioRef} src={audioUrl} onEnded={() => setIsPlaying(false)} />
                    <Box mt={2}>
                        <IconButton onClick={handlePlayPause} size="large">
                            {isPlaying ? <PauseIcon fontSize="large" /> : <PlayArrowIcon fontSize="large" />}
                        </IconButton>
                    </Box>
                    <Typography variant="body1">{isPlaying ? 'Playing...' : 'Paused'}</Typography>
                </Box>
            )}

            <Box m={2} pt={3}>
                <Button onClick={() => logoutFunction()} variant="contained">Logout</Button>
            </Box>

            <CommonPopup
                colorCode={somethingWentWrongPopup.colorCode}
                popup={somethingWentWrongPopup.popup}
                setPopup={() => {
                    if (somethingWentWrongPopup.occurrence === "onClick") {
                    } else {
                        setSomethingWentWrongPopup({
                            occurrence: "",
                            popup: false,
                            message: "",
                        });
                    }
                }}
                message={somethingWentWrongPopup.message}
                title={somethingWentWrongPopup.title}
                buttonTitle={"OK"}
            />
        </Box>
    )

}

export default AudioUpload;