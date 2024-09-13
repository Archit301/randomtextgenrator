import express, { Router } from "express"


import  { 
    generateMeaningfulText,
    generateRandomTextwithuserlength, 
    generateRandomTextwithlength, 
    savetext, 
    getsavetext,
    generateRandom,} from "../controllers/textgenrator_controller.js";
import { generateSnippet } from "../controllers/codeSnippet_controller.js";
import { getRandomJoke } from "../controllers/joke_controller.js";
import { getRandomStory } from "../controllers/story_controller.js";

const router=express.Router();



router.get('/generateRandomText',generateRandom)
router.get('/generate-random-text-custom', generateRandomTextwithuserlength);

// Route to generate random text with only length specified (default to alphabetic)
router.get('/generate-random-text-length', generateRandomTextwithlength);

// Route to save text with associated userId
router.post('/save-text', savetext);

// Route to fetch saved texts by userId
router.get('/get-saved-text', getsavetext);
router.get('/generate-meaningful-text',generateMeaningfulText)
router.get('/code-snippet/:language', generateSnippet);
router.get('/getrandomjokes', getRandomJoke);
router.get('/getrandomstory/:storyType', getRandomStory);


export default router;