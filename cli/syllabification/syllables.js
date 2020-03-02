#!/usr/bin/env node
let cli = require('cli');

//You can (optionally) boost the width of output with:
cli.width = 120;

//You can also adjust the width of the options/command definitions
//cli.option_width = 25;

let VOWEL_REGEX = /^[aeiouy]/;
let DIPHTHONG_REGEX = /^(ae|au|ei|eu|oe|ui)/;

let getSyllables = (str) => {
    let syllables = [];

    let i = 0;
    while (i < str.length) {
        let type = null;
        let charCount = 0;

        let subString = str.slice(i);
        if (subString.match(DIPHTHONG_REGEX)) {
            charCount = 2;
            type = 'diph';
        } else if (subString.match(VOWEL_REGEX)) {
            charCount = 1;
            type = 'vowel';
        }

        if (charCount > 0) {
            let start = i;
            let end = start + charCount;
            let characters = str.slice(start, end);
            characters && syllables.push({ start, end, type, characters });
            i = end;
        } else {
            i++;
        }
    }
    return syllables;
};


let syllabify = (word) => {
    // 1. Every Latin word has as many syllables as it has vowels or diphthongs.
    return getSyllables(word);
};

cli.parse({
    //foo: ['f', long_desc]
});

cli.main((args, options) => {

    let syllableSets = args.map((arg) => {
        return {
            word: arg,
            syllables: syllabify(arg) || []
        };
    });

    cli.info(`printing syllables for ${syllableSets.length} word(s): ${args}`);
    syllableSets.forEach((syllableSet) => {
        cli.info(`${syllableSet.word}:`);
        syllableSet && syllableSet.syllables.forEach((syllable) => {
            cli.info(`${syllable.type} \t ${syllable.start}-${syllable.end} \t ${syllable.characters}`);
        });
    });
});





let getVowels = (str) => {
    let vowels = [];
    for (let i = 0; i < str.length; i++)  {
        let character = str[i];
        if (character.match(VOWEL_REGEX)) {
            vowels.push({
                pos: i,
                word: str,
                vowel: str.charAt(i)
            });
        }
    }

    return vowels;
};

