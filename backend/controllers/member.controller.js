import Team from "../models/team.model.js"
import User from "../models/user.models.js";


export const addMember = async (req, res) => {
    try {
        const userId = req.user._id;
        const { addMemberId } = req.body;
    
        if (userId == addMemberId) {
          return res.status(400).json({ message: "Cannot add yourself" });
        }
    
        const memberToAdd = await User.findById(addMemberId);
        if (!memberToAdd) {
          return res.status(404).json({ message: "Member not found" });
        }

        let team = await Team.findOne({ "members.user": userId })
    
        if (!team) {
          team = await Team.create({
            createdBy:userId,
            members: [
              { user: userId, role: "Admin" },
              { user: addMemberId, role: "Member" },
            ],
          });
          await team.populate("members.user", "name email profilePic");
          return res.status(200).json({ message: team});
        }
    
        const isAdmin = team.members.find(
          (m) => m.user.toString() === userId.toString() && m.role === "Admin"
        );
    
        if (!isAdmin) {
          return res.status(403).json({ message: "You are not admin of this team" });
        }
    
        const alreadyMember = team.members.find(
          (m) => m.user.toString() === addMemberId.toString()
        );
        if (alreadyMember) {
          return res.status(400).json({ message: "User is already a team member" });
        }

        team.members.push({ user: addMemberId, role: "Member" });
        await team.save();

        await team.populate("members.user", "name email profilePic");
        res.status(200).json({ message: team});
      } catch (err) {
        console.error("Error in addMember:", err);
        res.status(500).json({ message: "Internal server error", error: err.message });
        
      }
};

export const removeMember= async(req,res)=>{
    try {
        const userId = req.user._id;
        const {memberId} = req.body;
    
        const team = await Team.findOne({
            createdBy:userId,
            members:{
            $elemMatch:{user:userId, role:"Admin"}
            }
           
        })
        if(!team){
            return res.status(403).json({message:"Onlu amdin can recive or no team found"})
        }
    
        const isMemberInTeam = team.members.find(
            (m) => m.user.toString() === memberId
          );
      
          if (!isMemberInTeam) {
            return res.status(404).json({ message: "User is not in your team" });
          }
      
    
          if (memberId == userId) {
            await Team.findByIdAndDelete(team._id);
            return res.status(200).json({ message: "Team deleted because admin left",teamDeleted: true  });
          }
        team.members = team.members.filter(
            (m) => m.user.toString() !== memberId
          );
      
          await team.save();
          await team.populate("members.user", "name email profilePic");
          res.status(200).json({ message: "Member removed successfully", team });
    } catch (error) {
        res.status(400).json({ message: error});
    }
}

export const listMembers = async (req, res) => {
    try {
      const userId = req.user._id;
  
      const team = await Team.findOne({ "members.user": userId }).populate(
        "members.user",
        "name email profilePic"
      );
  
  
      res.status(200).json({ members: team.members });
    } catch (error) {
      
    }
  };
