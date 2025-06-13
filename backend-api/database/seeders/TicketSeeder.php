<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class TicketSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('tickets')->insert([
            'user_id' => 1,
            'subject' => 'Test Ticket',
            'description' => 'This is a test ticket',
            'status' => 'open',
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    }
}