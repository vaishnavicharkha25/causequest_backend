import { Request, Response, Router } from 'express';
import logger from '../utils/winstonLogger';
import HttpErrorMessage from '../constants/httpErrorMessage';
import ngoRouter from '../api/ngo/ngo_route';

const router = Router();
const NAMESPACE = '[SERVER]:';

// Log every request
router.use((req, res, next) => {
    logger.log({
        message: `${NAMESPACE} METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`,
        level: 'info'
    });

    res.on('finish', () => {
        logger.log({
            message: `${NAMESPACE} METHOD: [${req.method}] - URL: [${req.url}] - STATUS: [${res.statusCode}] - IP: [${req.socket.remoteAddress}]`,
            level: 'info'
        });
    });

    next();
});

// Health check route
router.get('/', (req: Request, res: Response) => {
    res.send('SSM API is running!');
});

// Mount NGO routes under /api
router.use('/ngo', ngoRouter);

// 404 handler
router.use((req, res) => {
    const error = new Error(HttpErrorMessage.API_ENDPOINT_NOT_FOUND);
    res.status(404).json({ message: error.message });
});

export default router;
