const express = require('express');
const router = express.Router();
const Event = require('../models/event');
const axios = require('axios');

// const meetupAPI = axios.create({
//     baseURL: 'https://api.meetup.com/find/upcoming_events?',
// });

// const eventbriteAPI = axios.creat({
//     baseURL: 'https://www.eventbriteapi.com/v3/users/me/?token=MYTOKEN'
// });


// axios.get(`https://www.eventbriteapi.com/v3/events/search/?token=${eventbriteKey}&categories=${eventbriteCategories}&location.address=${eventbriteLocation}&location.within=${userRadius}mi`)
  
// let eventbriteKey = 'ZJYXEPK4OFMGCTEUVMYH'

// let eventbriteCategories = '102'

// let eventbriteLocation = 'miami'

// gets all events
router.get('/events', (req, res, next) => {
    console.log('hiiiiiiiiiiiiiii :');

    // Event.find()
    // .then((allTheEvents) => {
    // https://api.meetup.com/find/upcoming_events?key=726f391116101c5b316166a3d4411e&zip=33130&category=34&radius=10&sign=true
    
    
    let userZipCode = '33130'; // Miami zip hard coded
    
    let userRadius = '10'; // 10 miles hard coded
    
    let meetupKey = '726f391116101c5b316166a3d4411e'; // meetup API key
    
    //let meetupArray = [];

    axios.get(`https://api.meetup.com/find/upcoming_events?key=${meetupKey}&zip=${userZipCode}&category=34&radius=${userRadius}&sign=true`)
    
        .then((meetupEvents) => {

            let meetupArray = [];
            // console.log(meetupEvents.data.events.map(event => event.name));
            const filteredArray = meetupEvents.data.events.map((event) => {
                // console.log('event data :', event.name, event.id);
                let aMeetupObj = {
                    name: event.name,
                    // description: event.description,
                    apiID: event.id,
                };

                // console.log('aMeetupObj :', aMeetupObj);
                meetupArray.push(aMeetupObj);
                console.log('meetupArray: ', meetupArray);
                

            });
            return res.json(meetupArray);
        })
            
                //             Event.create(filteredArray)
                //                 .then(() => {
              
                //                     axios google cal api
                //             })
                //         })
        .catch(err => console.log('Error finding all the events: ', err));
        
});



//gets ONE event
router.get('/events/details/:id', (req, res, next) => {
    const id = req.params.id;
    Event.findById(id)
        .then((theEvent) => {
            res.json(theEvent)
                .catch(err => console.log('Error while finding event by ID: ', err));
        });
});





module.exports = router;