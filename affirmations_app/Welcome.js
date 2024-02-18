import { Layout, Text, Button } from "@ui-kitten/components";
import { StyleSheet, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import {
    Audio,
    InterruptionModeAndroid,
    InterruptionModeIOS,
    ResizeMode,
    Video
} from 'expo-av';
import { useState, useEffect } from "react";
import * as FileSystem from "expo-file-system";
import { useAction } from "convex/react";
import { api } from "./convex/_generated/api";

const { width, height } = Dimensions.get("window");

export default function Welcome({ navigation }) {
    console.log(navigation);

    const [recording, setRecording] = useState();

    const uploadRecording = useAction(api.recordings.uploadRecording);
    const getCompletion = useAction(api.recordings.getCompletion);
    const getVoiceCompletion = useAction(api.recordings.getVoiceCompletion);

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

        const playbackObject = new Audio.Sound();
        await playbackObject.loadAsync({ uri: newUri });
        await playbackObject.playAsync();

        // Upload recording file to Convex
        console.log('Trying to upload file to Convex');

        const base64String = await readFileAsBlob(newUri);
        const storageId = await uploadRecording({ name: "Recording-" + Date.now(), base64String });

        console.log("Filed stored at storage id", storageId);
    };

    const buttonGetCompletion = async () => {
        console.log("Trying to get completion!");
        const completion = await getCompletion({ text: "Hi! My name is Josh, I'm a CS major at Stanford University. I joined a TreeHacks team last minute, but spent like 5 hours trying to read a stupid file off of this weird expo cross platform thing and now I'm really sad. We've got about 8 hours left, so let's see what we can do!" });
        console.log(completion);
    }

    const buttonGetVoiceCompletion = async () => {
        console.log("Trying to get completion!");

        const newUri = await getVoiceCompletion({storageId: "kg211hbxmrdkw39bk724b7zh9d6kpbjn"});

        await Audio.requestPermissionsAsync();
        await Audio.setAudioModeAsync({
            allowsRecordingIOS: true,
            playsInSilentModeIOS: true,
        });

        // const newUri = 'https://rightful-buzzard-92.convex.cloud/api/storage/92e2ffe0-f2e0-4f8b-9840-fce137298ee8';
        // console.log("Voice response at", newUri);
        const fileUri = FileSystem.documentDirectory + 'recordings/' + 'recordingss-' + Date.now() + ".wav";

        await FileSystem.downloadAsync(newUri, fileUri);
        console.log('Finished downloading to ', fileUri);
        // const fileUri = FileSystem.documentDirectory + 'recordings/example.mp3';
        await playAudio(fileUri);
    }

    const playAudio = async (fileUri) => {
        try {
            console.log('Requesting permissions..');

            await Audio.requestPermissionsAsync();
            await Audio.setAudioModeAsync({
                allowsRecordingIOS: true,
                playsInSilentModeIOS: true,
            });

            console.log("Finished perms");
            // await FileSystem.makeDirectoryAsync(FileSystem.documentDirectory + 'recordings-temp/', { intermediates: true });
            // await FileSystem.moveAsync({
            //     from: fileUri,
            //     to: FileSystem.documentDirectory + 'recordings-temp/testttt.m4a'
            //   });
    
            const playbackObject = new Audio.Sound();
            console.log("Object made, attempting load");
            // await playbackObject.loadAsync({ uri: FileSystem.documentDirectory + 'recordings-temp/testttt.m4a' });
            await playbackObject.loadAsync({ uri: fileUri }, {shouldPlay: true});
            console.log("Load finished, now playing");
            await playbackObject.playAsync();
            // Your sound is playing!

            // Dont forget to unload the sound from memory
            // when you are done using the Sound object
            // await sound.unloadAsync();
        } catch (error) {
            // An error occurred!
            console.error('AUDIO PLAY: ', error);
        }
    }

    useEffect(() => {
        return recording ? stopRecording : undefined;
    }, [recording]);

    // useEffect(() => {
    //     return sound
    //         ? () => {
    //             sound.unloadAsync();
    //         }
    //         : undefined;
    // }, [sound]);

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
            <Button onPress={buttonGetCompletion}>Get Completion</Button>
            <Button onPress={buttonGetVoiceCompletion}>Get Voice Completion</Button>
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