exports.sessionToBody = async (req,res,next) => {
    try {
        if (req.session.cartProducts) {
            console.log("session to body",req.session.cartProducts);
            req.body.cartProducts=req.session.cartProducts;
            next();
        } else { next() }
    } catch (err) { throw (err) }
}