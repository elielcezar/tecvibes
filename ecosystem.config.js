module.exports = {
  apps: [{
    name: 'tecvibes',
    script: '.next/standalone/server.js',
    cwd: process.cwd(), // Garante que roda da raiz do projeto
    instances: 1,
    exec_mode: 'fork',
    env: {
      NODE_ENV: 'production',
      PORT: process.env.PORT || 3006,
      // Garantir que o Next.js encontre os arquivos estáticos
      NEXT_STATIC_FOLDER: '.next/static',
      // KIT_API_SECRET: process.env.KIT_API_SECRET,
      // KIT_FORM_ID: process.env.KIT_FORM_ID
    },
    error_file: './logs/err.log',
    out_file: './logs/out.log',
    log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
    merge_logs: true,
    autorestart: true,
    max_memory_restart: '1G'
  }]
}