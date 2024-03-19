import express from 'express'
import Ads from '../modles/Ads.mjs'
import verifyToken from '../middlewares/verifyToken.mjs'

const router = express.Router()




//get all ads
router.get('/', async (req, res) => {
    const ads = await Ads.find()
    res.send({ message: 'Ads fetched successfully', data: ads })
})



//post your add from frountend
router.post('/post' , verifyToken ,async (req, res)=>{
    try{
        const ad = new Ads(req.body)
        await ad.save()
        res.send({message:"add successfully added."})
    }catch(e){
        res.send({message:e.message})
    }
   
})

//get single add
router.get('/:id' , async (req , res)=>{

    try{
        const ad = await Ads.findOne(({_id: req.params.id}))
        res.send(({message:" Single Data fatched successfully",singleAd:ad}))
    }catch(e){
        res.send({message : e.message})
    }
   
})




//delete add 
router.delete('/:id' ,verifyToken , async(req , res)=>{

    try{
        const deleteAd = await Ads.deleteOne({_id: req.params.id} ,req.body,
           {new: true} );
        res.send({message:"delet successfully" , deleteAd})

    }catch(e){
        res.send({message : e.message})
    }

})

//update 

router.put('/:id',verifyToken , async  (req , res)=>{

    try{
        const updateAd = await Ads.findOneAndUpdate({_id : req.params.id} , req.body,
            
            //return new updated document
            {new: true});
            res.send({message:"update succesfully" , updateAd})

    }catch(e){
        res.send({message : e.message})
    }
   
} )







export default router