import React, { useEffect, useState } from "react";
import { Modal, StyleSheet, View, Image, Text, Pressable } from 'react-native';
import NfcManager, { NfcTech } from 'react-native-nfc-manager';
import ScanGif from '../assets/scan.gif'
const ScanPopup = ({ open = false, handleClose,setData }) => {
    const [isScanning, setIsScanning] = useState(true);

    const readNdef = async () => {
        setIsScanning(true);
        NfcManager.start();
        try {
            // register for the NFC tag with NDEF in it
            await NfcManager.requestTechnology(NfcTech.Ndef);
            // the resolved tag object will contain `ndefMessage` property
            const tag = await NfcManager.getTag();
            if (tag) {
                handleClose();
                setData(JSON.stringify(tag))
            } else {
                setIsScanning(false)
            }
            console.warn('Tag found', tag);
        } catch (ex) {
                setIsScanning(false)
                console.warn('Oops!', ex);
        } finally {
            // stop the nfc scanning
            NfcManager.cancelTechnologyRequest();
        }
    }
    useEffect(() => {
        if (open) {
            readNdef();
        }
    }, [open])

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={open}
            onRequestClose={handleClose}>
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    {isScanning ?
                        <Image
                            source={ScanGif}
                            style={{
                                height: 400,
                                width: '100%'
                            }}
                            resizeMode='contain'
                        />
                        :
                        <>
                            <Text style={styles.modalText}>No tag found!</Text>
                            <View style={styles.btnContainer}>
                                <Pressable
                                    style={[styles.button, styles.buttonClose]}
                                    onPress={handleClose}>
                                    <Text style={styles.textStyle}>Cancel</Text>
                                </Pressable>
                                <Pressable
                                    style={[styles.button, styles.buttonOpen]}
                                    onPress={readNdef}>
                                    <Text style={styles.textStyle}>Try Again</Text>
                                </Pressable>
                            </View>
                        </>
                    }
                </View>
            </View>
        </Modal>
    );

}
const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.2)',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        width: '90%',
        alignItems: 'center',
        shadowColor: '#000',
        opacity: 1,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    btnContainer: {
        flexDirection: 'row',
        gap: 10
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    buttonOpen: {
        backgroundColor: '#F194FF',
    },
    buttonClose: {
        backgroundColor: '#2196F3',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
});
export default ScanPopup