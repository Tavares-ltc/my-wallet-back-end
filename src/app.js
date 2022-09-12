import express from 'express'
import cors from 'cors';
import signRoutes from './routes/sign.routes.js';
import sessionsRoutes from './routes/sessions.routes.js';
import cashflowRoutes from './routes/cashflow.routes.js';

const app = express();
app.use(cors());
app.use(express.json());

app.use(signRoutes);
app.use(sessionsRoutes);
app.use(cashflowRoutes);

app.listen(5000, () => {
    console.log('listen on port 5000')
})