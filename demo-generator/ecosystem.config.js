module.exports = {
  apps: [{
    name: 'demo-generator',
    script: './dist/index.js',
    cwd: __dirname,
    instances: 1,
    exec_mode: 'fork',
    
    // Environment
    env: {
      NODE_ENV: 'development',
      PORT: 3000,
    },
    env_production: {
      NODE_ENV: 'production',
      PORT: 3000,
    },
    
    // Restart policy
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    restart_delay: 4000,
    
    // Logging
    log_file: './logs/combined.log',
    out_file: './logs/out.log', 
    error_file: './logs/error.log',
    log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
    
    // Process management
    kill_timeout: 5000,
    wait_ready: true,
    listen_timeout: 10000,
    
    // Health monitoring
    min_uptime: '10s',
    max_restarts: 5,
  }]
};