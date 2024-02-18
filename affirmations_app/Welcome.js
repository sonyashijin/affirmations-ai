import { Layout, Text, Button } from "@ui-kitten/components";
import { StyleSheet, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Audio } from 'expo-av';
import { useState, useEffect } from "react";
import * as FileSystem from "expo-file-system";
import { useAction } from "convex/react";
import { api } from "./convex/_generated/api";

const { width, height } = Dimensions.get("window");

export default function Welcome({ navigation }) {
    console.log(navigation);

    const [recording, setRecording] = useState();
    const uploadRecording = useAction(api.recordings.uploadRecording);

    const readFileAsBlob = async (fileUri) => {
        try {
            const fileInfo = await FileSystem.getInfoAsync(fileUri);
            if (fileInfo.exists) {
                const blob = await FileSystem.readAsStringAsync(fileUri, { encoding: FileSystem.EncodingType.Base64 });
                return blob;
            } else {
                throw new Error('File does not exist');
            }
        } catch (error) {
            console.error('Error reading file as blob:', error);
        }
    };

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
        
        console.log("Moving file");
        const fileName = `recording-${Date.now()}.m4a`;

        // Move the recording to the new directory with the new file name
        await FileSystem.makeDirectoryAsync(FileSystem.documentDirectory + 'recordings/', { intermediates: true });
        await FileSystem.moveAsync({
          from: uri,
          to: FileSystem.documentDirectory + 'recordings/' + `${fileName}`
        });
        const newUri = FileSystem.documentDirectory + 'recordings/' + `${fileName}`;
        console.log("Now at:", newUri);

        // Upload recording file to Convex
        console.log('Trying to upload file to Convex');

        const base64String = await readFileAsBlob(newUri);
        const storageId = await uploadRecording({name: "Recording-" + Date.now(), base64String});

        console.log("Filed stored at storage id", storageId);
    };

    useEffect(() => {
        return recording ? stopRecording : undefined;
    }, [recording]);

    return (
        <LinearGradient colors={['#ffd383', '#ffb42c']} style={styles.layout}>
            <Text category="h1" style={{ textAlign: "center" }}>AffirmationsAI</Text>
            <Text category="h2" style={{ textAlign: "center" }}>Let's get to know you....</Text>
            <Button style={styles.button}
                onPress={recording ? stopRecording : startRecording}
                appearance="filled">{recording ? 'Stop Recording' : 'Start Recording'}</Button>
            <Button style={styles.button}
                onPress={() => navigation.navigate('Start')}
                appearance="filled">Start</Button>
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
        justifyContent: "center",
        alignItems: 'center',
    },
    button: {
        marginVertical: 8,
        minWidth: 200,
    }
});