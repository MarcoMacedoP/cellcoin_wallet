import React, { Component, useState, useEffect } from 'react';

import {
    Text,
    View,
    TouchableOpacity,
    Image,
    ViewPropTypes,
    Dimensions
} from 'react-native';

import { styles } from './VirtualKeyboard.style';

type VKeyComponentProps = {
    color?: string,
    onPress?: any,
    applyBackspaceTint?: boolean,
    value?: string,
};

export const VKeyComponent: React.FC<VKeyComponentProps> = ({
    color = 'black',
    onPress,
    applyBackspaceTint = true,
    value,
}) => {
    const pressMode = 'string';
    const decimal = true;
    const backspaceImg = require('./backspace.png');
    const [state , setState] = useState({
        text: value,
    });
    useEffect(() => {
        setState({
            text: value,
        })
    }, [value])

    const Backspace = () => {
        return (
            <TouchableOpacity
                accessibilityLabel='backspace'
                style={styles.backspace}
                onLongPress={() => { onClick('longback') }}
                onPress={() => { onClick('back') }}>
                <Image source={backspaceImg} resizeMode='contain' style={applyBackspaceTint && ({ tintColor: color })} />
            </TouchableOpacity>
        );
    }

    const Row = (numbersArray) => {
        let cells = numbersArray.map((val) => Cell(val));
        return (
            <View style={styles.row}>
                {cells}
            </View>
        );
    }

    const Cell = (symbol) => {
        return (
            <TouchableOpacity style={[styles.cell]}
                key={symbol}
                accessibilityLabel={symbol.toString()}
                onPress={() => { onClick(symbol.toString()) }}>
                <Text style={[styles.number, { color: color }]}>{symbol}</Text>
            </TouchableOpacity>
        );
    }

    const onClick = (val) => {
        if (pressMode === 'string') {
            let curText = state.text;
            if (val == '0') {
                if (state.text !== '0') {
                    if (isNaN(val)) {
                        if (val === 'back') {
                            curText = curText.slice(0, -1);
                        } else if (val === 'longback') {
                            curText = '';
                        }
                        else {
                            curText += val;
                        }
                    } else {
                        curText += val;
                    }
                }
            } else {
                if (isNaN(val)) {
                    if (val === 'back') {
                        curText = curText.slice(0, -1);
                    } else if (val === 'longback') {
                        curText = '';
                    }
                    else {
                        curText += val;
                    }
                } else {
                    curText += val;
                }
            }
            setState({ text: curText });
            onPress(curText);
        } else /* if (props.pressMode == 'char')*/ {
            if (val === 'longback') {
                onPress(0);
            } else {
                onPress(val);
            }
        }
    }


    return (
        <View style={[styles.container]}>
            {Row([1, 2, 3])}
            {Row([4, 5, 6])}
            {Row([7, 8, 9])}
            <View style={styles.row}>
                {decimal ? Cell('.') : <View style={{ flex: 1 }} />}
                {Cell(0)}
                {Backspace()}
            </View>
        </View>
    );
};