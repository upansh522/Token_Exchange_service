require('dotenv').config({ path: '../.env' });
const Redis = require('ioredis');

console.log('Testing Redis Connection...');
console.log(`Host: ${process.env.REDIS_HOST}`);
console.log(`Port: ${process.env.REDIS_PORT}`);

const redis = new Redis({
    host: process.env.REDIS_HOST,
    port: Number(process.env.REDIS_PORT),
    // Add these if your redis needs a password or TLS
    // password: process.env.REDIS_PASSWORD,
    // tls: process.env.REDIS_TLS === 'true' ? {} : undefined,
});

redis.on('connect', () => {
    console.log('✅ Connected to Redis successfully!');
    
    // Test simple set/get
    redis.set('test-key', 'hello world', (err) => {
        if (err) console.error('Set error:', err);
        else console.log('Write test successful');
        
        redis.get('test-key', (err, result) => {
            if (err) console.error('Get error:', err);
            else console.log('Read test successful:', result);
            
            redis.quit();
        });
    });
});

redis.on('error', (err) => {
    console.error('❌ Redis connection error:', err);
    redis.quit();
});
