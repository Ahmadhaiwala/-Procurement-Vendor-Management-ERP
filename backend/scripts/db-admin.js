#!/usr/bin/env node

/**
 * Database Administration Script
 * Quick database operations for VendorBridge
 */

require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT) || 5432,
  database: process.env.DB_NAME || 'vendorbridge',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD,
});

const commands = {
  // List all tables
  async tables() {
    const result = await pool.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      ORDER BY table_name
    `);
    console.log('📋 Tables in database:');
    result.rows.forEach(row => console.log(`  - ${row.table_name}`));
  },

  // Show users
  async users() {
    const result = await pool.query(`
      SELECT id, email, full_name, role, is_active, email_verified, created_at
      FROM users 
      ORDER BY created_at DESC
    `);
    console.log('👥 Users in database:');
    result.rows.forEach(user => {
      console.log(`  ${user.email} (${user.role}) - ${user.is_active ? '✅' : '❌'} ${user.email_verified ? '📧' : '📧❌'}`);
    });
  },

  // Show organizations
  async orgs() {
    const result = await pool.query(`
      SELECT id, name, gstin, is_active, created_at
      FROM organizations 
      ORDER BY created_at DESC
    `);
    console.log('🏢 Organizations:');
    result.rows.forEach(org => {
      console.log(`  ${org.name} (${org.gstin || 'No GSTIN'}) - ${org.is_active ? '✅' : '❌'}`);
    });
  },

  // Show purchase orders
  async pos() {
    const result = await pool.query(`
      SELECT po.po_number, po.status, po.total_amount, po.created_at,
             v.company_name as vendor_name
      FROM purchase_orders po
      JOIN vendors v ON po.vendor_id = v.id
      ORDER BY po.created_at DESC
    `);
    console.log('📦 Purchase Orders:');
    result.rows.forEach(po => {
      console.log(`  ${po.po_number} - ${po.vendor_name} - ₹${parseFloat(po.total_amount).toLocaleString()} (${po.status})`);
    });
  },

  // Database stats
  async stats() {
    console.log('📊 Database Statistics:');
    
    const tables = ['users', 'organizations', 'vendors', 'rfqs', 'quotations', 'purchase_orders', 'invoices'];
    
    for (const table of tables) {
      try {
        const result = await pool.query(`SELECT COUNT(*) as count FROM ${table}`);
        console.log(`  ${table}: ${result.rows[0].count} records`);
      } catch (err) {
        console.log(`  ${table}: Error - ${err.message}`);
      }
    }
  },

  // Help
  help() {
    console.log('🛠️  VendorBridge Database Admin Commands:');
    console.log('  tables  - List all database tables');
    console.log('  users   - Show all users');
    console.log('  orgs    - Show all organizations');
    console.log('  pos     - Show purchase orders');
    console.log('  stats   - Show database statistics');
    console.log('  help    - Show this help message');
    console.log('');
    console.log('Usage: node scripts/db-admin.js <command>');
  }
};

async function main() {
  const command = process.argv[2];
  
  if (!command || !commands[command]) {
    commands.help();
    process.exit(1);
  }

  try {
    console.log(`🔍 Running command: ${command}\n`);
    await commands[command]();
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

if (require.main === module) {
  main();
}