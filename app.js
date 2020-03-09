// Copyright 2020 OverApp
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

'use strict';

const express = require('express')

const app = express()

// Middleware

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// Routes

app.get('/', (req, res) => {
  res
    .status(200)
    .send('Welcome to MagnaeBot!')
    .end()
})

app.post('/command', (req, res) => {

  let payload = req.body
  let command = payload.command

  const example = {
    blocks: [{
      type: "section",
      text: {
        type: "mrkdwn",
        text: `You sent me this command: ${command}`
      }
    }]
  }

  res
    .status(200)
    .send(example)
    .end()

})

app.post('/order', (req, res) => {

  let payload = req.body
  let command = payload.command
  let text = payload.text
  const options = text.split(' ', 2)
  const foodOption = options[0]
  const quantityOption = options[1]

  //TODO add command string validation
  //if (command === '/order'){}

  //TODO
  // If \order is sent, add item and show current list

  res
    .status(200)
    .send({
      blocks: [{
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: 'You ordered this:'
        },
        fields: [
          {
            type: 'mrkdwn',
            text: '*Food*'
          },
          {
            type: 'mrkdwn',
            text: '*Quantity*'
          },
          {
            type: 'mrkdwn',
            text: foodOption
          },
          {
            type: 'mrkdwn',
            text: quantityOption
          }
        ]
      }]
    })
    .end()

})

// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`)
  console.log('Press Ctrl+C to quit.')
})

module.exports = app
