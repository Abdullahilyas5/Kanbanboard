const Task = require('../models/Task.js')
const User = require('../models/User')
const jwt = require('jsonwebtoken');
const Board = require('../models/Board.js');



const verification = (req, res, next) => {
    try {
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({ message: 'Authentication token is missing' });
        }

        jwt.verify(token, 'secret', (err, decoded) => {
            if (err) {
                return res.status(401).json({ message: 'Invalid token' });
            }

            console.log("auth user response :",decoded)
            if(decoded){
                req.isauthorize = true ;
                req.user = decoded;
            }
            next();
        });
    } catch (error) {
        return res.status(401).json({ msg: error.message });
    }
};


const displayTask = async(req, res)=>{

      try {
            const SelectedBoard = req.params.boardId;
          
    
            const findboard = await Board.findOne({ _id: SelectedBoard });
            if (!findboard) {
                return res.status(404).json({
                    message: 'Board not found in the database'
                });
            }
            const Tasks = await Task.find({ board: SelectedBoard });
    
            res.status(200).json(Tasks).message(" selected board have these tasks :", Tasks);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
}

module.exports =  {displayTask , verification} ;