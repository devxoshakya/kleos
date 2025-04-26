#!/usr/bin/env node

import { exec } from 'child_process';
import process from 'process';

// Start the Next.js development server
const nextProcess = exec('npx next dev', { stdio: 'inherit' });

// Log process ID
console.log(`Next.js development server started with PID: ${nextProcess.pid}`);

// Handle process termination
process.on('SIGINT', () => {
  console.log('Shutting down Next.js server...');
  nextProcess.kill('SIGINT');
  process.exit(0);
});

// Forward stdout and stderr
nextProcess.stdout?.on('data', (data) => {
  console.log(data.toString());
});

nextProcess.stderr?.on('data', (data) => {
  console.error(data.toString());
});

nextProcess.on('exit', (code) => {
  console.log(`Next.js process exited with code ${code}`);
  process.exit(code);
});