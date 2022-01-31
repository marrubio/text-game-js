#!/usr/bin/env node

import chalk from 'chalk';
import inquirer from 'inquirer';
import gradient from 'gradient-string';
import chalkAnimation from 'chalk-animation';
import figlet from 'figlet';
import { createSpinner } from 'nanospinner';

let playerName;

const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));

async function wellcome() {
    console.clear();
    await title();
    await sleep(100);      
    const rainbowTitle = chalkAnimation.rainbow(
        'by Mario Rubio 2022 \n'
    );    
    await sleep();    
    rainbowTitle.stop();
    

    console.log(`
        ${chalk.bgBlue('HOW TO PLAY')}
        I am a process on your computer. If you get any questions wrong i will be ${chalk.bgRed('Killed')}
        So get all the questions right...
    `);
}

function title(){
    
    const msg = `TEXT GAME JS`;
  
    figlet(msg, (err, data) => {
        console.log(gradient.pastel(data));
    })
}

async function askName(){
    const answers = await inquirer.prompt({
        name: 'player_name',
        type: 'input',
        message: 'What is your name?',
        default() {
            return 'Marshkalk';
        }
    });
    playerName = answers.player_name;
}


async function question1(){
    const answers = await inquirer.prompt({
        name: 'question_1',
        type: 'list',
        message: 'JavaScript was created in 10 days then released on\n',
        choices:[
            'May 23rd, 1995',
            'Nov 24th, 1995',
            'Dec 4th, 1995',
            'Dec 17, 1996'
        ],

    });
    return handleAnswer(answers.question_1 == 'Dec 4th, 1995');
}

async function handleAnswer(isCorrect){
    const spinner = createSpinner('Checking answer..').start();
    await sleep();

    if (isCorrect) {
        spinner.success({ text: `Nice work ${playerName}. That's a legit answer`});
    }else{
        spinner.error({ text: `Game over, you lose ${playerName}!`});
        process.exit(1);
    }
}

function winner(){
    
    const msg = `Congrats , ${playerName}!\n Y O U  W I N`;

    figlet(msg, (err, data) => {
        console.log(gradient.pastel.multiline(data));
    })
}


await wellcome();

await askName();

await question1();

await winner();