const Discord = require('discord.js');
const axios = require('axios');
const countries = require("./countries.json");
const client = new Discord.Client();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

const url = 'https://api.covid19api.com/total/country/';
const WAKE_COMMAND = '!cases';

client.on('message', async (msg) => {
  const content = msg.content.split(/[ ,]+/);
  if(content[0] === WAKE_COMMAND){
    if(content.length > 2){
      msg.reply("Too many arguments...")
    }
    else if(content.length === 1){
      msg.reply("Not enough arguments")
    }
    else if(!countries[content[1]]){
      msg.reply("Your input must be a country-name")
    }
    else{
      const slug = content[1]
      const payload = await axios.get(`${url}${slug}`);
      const covidData = payload.data.pop();
      msg.reply(`Confirmed: ${covidData.Confirmed}, Deaths: ${covidData.Deaths}, Recovered: ${covidData.Recovered}, Active: ${covidData.Active} `);
    }
  }
});
client.login(process.env.TOKEN);
