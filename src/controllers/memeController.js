const axios= require('axios')

const getAllMemes = async (req, res)=>{
    let options = {
        method: 'post',
        url: 'https://api.imgflip.com/caption_image?template_id=80707627&text0=band&text1=finish&username=chewie12345& password=meme@123'
    }
    let result = await axios(options);
    res.status(200).send({ msg: result.data, status: true })

}
module.exports.getAllMemes=getAllMemes