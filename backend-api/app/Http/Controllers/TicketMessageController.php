<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateTicketRequest;
use App\Models\TicketMessage;
use Illuminate\Http\Request;

class TicketMessageController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(CreateTicketRequest $request)
    {
        $validated = $request->validated();

        try {
            if ($request->hasFile('attachment')) {
                $validated['attachment'] = $request->file('attachment')->store('attachments', 'public');
            }

            TicketMessage::create($validated);

            return response()->json(['message' => 'Ticket created successfully'], 201);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to create ticket'], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(TicketMessage $ticketMessage)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(TicketMessage $ticketMessage)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, TicketMessage $ticketMessage)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(TicketMessage $ticketMessage)
    {
        //
    }
}
