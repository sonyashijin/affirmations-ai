import { Layout, Text, Button } from "@ui-kitten/components";
import { StyleSheet, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Audio } from 'expo-av';
import { useState, useEffect } from "react";

const { width, height } = Dimensions.get("window");

export default function Welcome() {

    const [recording, setRecording] = useState();

    const startRecording = async () => {
        try {
            console.log('Requesting permissions..');

            await Audio.requestPermissionsAsync();
            await Audio.setAudioModeAsync({
                allowsRecordingIOS: true,
                playsInSilentModeIOS: true,
            });

            console.log('Starting recording...');

            const recording = new Audio.Recording();
            await recording.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
            await recording.startAsync();

            setRecording(recording);

            console.log('Recording started');
        } catch (err) {
            console.error('Failed to start recording', err);
        }
    };

    const stopRecording = async () => {
        console.log('Stopping recording..');

        setRecording(undefined);
        await recording.stopAndUnloadAsync();
        const uri = recording.getURI();

        console.log('Recording stopped and stored at', uri);

        // Upload recording file to Convex
        console.log('Trying to upload file to Convex');

        const response = await fetch(uri);
        console.log('Fetched file contents', response);

        const recordingBlob = await response.blob();
        console.log('Got the blob!', recordingBlob);

        const postUrl = await generateUploadUrl();
        console.log('Got the url!', postUrl);

        console.log('Making post request');
        const result = await fetch(postUrl, {
            method: "POST",
            headers: { "Content-Type": "audio/mp4" }, // !! BAD! I'm hardcoding the file type for the demo
            body: recordingBlob,
        });
        const { storageId } = await result.json();

        console.log("Filed stored at storage id", storageId);
    };

    useEffect(() => {
        return recording ? stopRecording : undefined;
    }, [recording]);

    // TODO Add cool animations!

    return (
        <LinearGradient colors={['#ffd383', '#ffb42c']} style={styles.layout}>
            <Text category="h1" style={{ textAlign: "center" }}>AffirmationsAI</Text>
            <Text category="h2" style={{ textAlign: "center" }}>Let's get to know you....</Text>
            <Button style={styles.button}
                onPress={recording ? stopRecording : startRecording}
                appearance="filled">{recording ? 'Stop Recording' : 'Start Recording'}</Button>
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    layout: {
        flex: 1,
        width: width,
        height: height,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center"
    },
    button: {
        marginVertical: 8,
    }
});