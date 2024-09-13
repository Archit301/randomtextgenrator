
import { OpenAI } from 'openai';
import axios from 'axios';
import Saved from "../models/saved_model.js";
import generateRandomText from "../utills/randomtextgenrator_utils.js";


export const generateRandom = (req, res) => {
    try {
        const  length = 50, charset = ['alphabetic'] 
        const text = generateRandomText(parseInt(length), charset);
        res.status(200).json({ text });
    } catch (error) {
        console.log(error)
    }
   
  };

  export const generateRandomTextwithuserlength = (req, res) => {
    const { length, charset } = req.query;
 // console.log(req.query)
    try {
      if (!length || isNaN(length) || length <= 0) {
        return res.status(400).send('Invalid length');
      }
  
      const charsetsArray = charset ? charset.split(',') : ['alphabetic'];
      console.log(charsetsArray)
      const result = generateRandomText(parseInt(length), charsetsArray);
      res.status(200).json({ result });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Error generating text' });
    }
  };
  export const generateRandomTextwithlength = (req, res) => {
    const { length  } = req.query;
    try {
        if (!length || isNaN(length) || length <= 0) {
            return res.status(400).send('Invalid length');
          }
    const charsetsArray =  ['alphabetic'];
        const result = generateRandomText(parseInt(length), charsetsArray);
        res.status(200).json({ result }); 
    } catch (error) {
        console.log(error)
    }
 
  };

  export const savetext = async (req, res) => {
    try {
      const { content, userId } = req.body;
      if (!content || !userId) {
          return res.status(400).json({ error: 'Content and userId are required' });
      }

      const newText = new Saved({ content, userId });
      await newText.save();
      res.status(201).json({ message: 'Text saved successfully', text: newText });
  } catch (error) {
      res.status(500).json({ error: 'Failed to save text', details: error.message });
  }
  };
  

  export const getsavetext = async (req, res) => {
    try {
      const { userId } = req.body;        
      const savedTexts = await Saved.find({ userId });
      res.status(200).json(savedTexts);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch saved text', details: error.message });
    }
  };

  




  // Configure OpenAI
  const HF_API_KEY = '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'; // Replace with your Hugging Face API key
  const HF_MODEL = 'gpt2'; // Choose the model you want to use
  
  const prompts = [
    'Once upon a time in a land far, far away,',
    'In the heart of the bustling city,',
    'Amidst the serene countryside,',
    'On a stormy night at the edge of the forest,',
    'Deep within the ancient ruins,'
  ];
  export const generateMeaningfulText = async (req, res) => {
    const {  max_length = 50 } = req.query;
  
    try {
    //   if (!prompt) {
    //     return res.status(400).json({ error: 'Prompt is required.' });
    //   }
    const randomPrompt = prompts[Math.floor(Math.random() * prompts.length)];
      // Generate text using Hugging Face API
      const response = await axios.post(
        `https://api-inference.huggingface.co/models/${HF_MODEL}`,
        { inputs: randomPrompt, parameters: { max_length } },
        { headers: { Authorization: `Bearer ${HF_API_KEY}` } }
      );
  
      // Send the generated text as response
      res.status(200).json({ text: response.data[0].generated_text });
    } catch (error) {
      console.error('Error generating text:', error);
      res.status(500).json({ error: 'An error occurred while generating text.' });
    }
  };
  

 