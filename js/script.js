/*
 * Copyright (c) 2024, Xuelei Fan. All rights reserved.
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
 */

const codeInput = document.getElementById('code');
const runButton = document.getElementById('run-button');
const outputElement = document.getElementById('output');
const outputText = outputElement.querySelector('#output-text');

const codev = {
    run: async () => {
        const code = codeInput.value;

        try {
            const response = await fetch('/go', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    code
                })
            });
            const data = await response.json();

            outputElement.classList.remove('good', 'failed');
            outputElement.classList.add(data.status ? 'good' : 'failed');
            outputText.textContent = data.message;
        } catch (error) {
            outputElement.classList.remove('good', 'failed');
            outputElement.classList.add('failed');
            outputText.textContent = `Error: ${error.message}`;
        }

        // Display output
        outputElement.style.display = 'block';
    }
};

runButton.addEventListener('click', codev.run);
