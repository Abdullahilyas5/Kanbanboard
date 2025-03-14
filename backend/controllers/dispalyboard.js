const Board = require('../models/Board.js');
const User = require('../models/User.js');

const displayBoard = async (req, res) => {
    try {
        const user = req.user;

        if (!user) {
            return res.status(401).json({
                message: 'You need to login to display the board',
            });
        }

        const finduser = await User.findOne({ email : user.email });
        if (!finduser) {
            return res.status(404).json({
                message: 'User not found in the database'
            });
        }

        const boards = await Board.find({ user: finduser._id });
        
        console.log('Boards after fetching:', boards);
        res.json(boards);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

module.exports = { displayBoard }