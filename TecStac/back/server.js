import config from './config';
import path from 'path';
import express from 'express';
import userRoute from './routing/userRoute';
import productRoute from './routing/productRoute';
import orderRoute from './routing/orderRoute';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';

const mongodbUrl = config.MONGODB_URL; 
mongoose.connect(mongodbUrl, {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useCreateIndex: true
}).catch(error => console.log(error.reason));

const app = express();
app.use(bodyParser.json());
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/orders", orderRoute);
app.get("/api/config/paypal", (req, res) => {
    res.send(config.PAYPAL_CLIENT_ID);
});

app.use(express.static(path.join(__dirname, '/../front/build')));
app.get('*', (req, res) => {
    res.sendFile(path.join(`${__dirname}/../front/build/index.html`))
});
app.listen(config.PORT, () => {console.log('Server started at http://localhost:5000')});
