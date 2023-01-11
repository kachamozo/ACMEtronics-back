
const { Comment, Product } = require("../connection/db");


const postComments = async (req, res) => {
    try {
        const { id, comments } = req.body

        let newComment = await Comment.create({
            text: comments
        })
        
        const product = await Product.findOne({
            where: {
                id:id
            }
        });
        
        
       await product.addComment(newComment)

        res.send("Added Comments")

    } catch (error) {
        console.log(error)
    }
}



module.exports = {
    postComments
}