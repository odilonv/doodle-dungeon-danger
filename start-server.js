const { exec, spawn } = require('child_process');

// Fonction pour exécuter une commande shell et renvoyer une promesse
const execCommand = (command) => {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(`Erreur: ${stderr}`);
        reject(error);
      } else {
        resolve(stdout.trim());
      }
    });
  });
};

// Fonction pour démarrer un processus en arrière-plan
const spawnProcess = (command, args) => {
  const child = spawn(command, args, { stdio: 'inherit', shell: true });
  child.on('error', (error) => {
    console.error(`Erreur lors du démarrage du processus: ${error.message}`);
  });
  return child;
};

const startServer = async () => {
  try {
    console.log('Démarrage des conteneurs Docker...');
    await execCommand('docker-compose up -d');

    console.log('Attente de 2 secondes pour que MySQL démarre...');
    await new Promise(resolve => setTimeout(resolve, 2000));

    console.log('Démarrage du serveur USER ...');
    const usersServerProcess = spawnProcess('node', ['backend/user-service/src/userServer.js']);
    const herosServerProcess = spawnProcess('node', ['backend/hero-service/src/heroServer.js']);
    
    console.log('Le serveur est en cours d\'exécution.');

    usersServerProcess.on('close', (code) => {
      console.log(`Le serveur users s'est arrêté avec le code ${code}`);
    });

    herosServerProcess.on('close', (code) => {
      console.log(`Le serveur heroes s'est arrêté avec le code ${code}`);
    });
  } catch (error) {
    console.error('Erreur lors du démarrage du serveur:', error);
  }
};

startServer();
