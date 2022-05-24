<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Item_histories;
use Illuminate\Http\Request;

class ItemHistoriesController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $itemId = $request->header()["item-id"][0];
        $item_histories = Item_histories::where('item_id', $itemId)->get();
        return response()->json($item_histories);
    }


    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $requestItem
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $this->validate($request, [
            'item_id' => 'required',

        ]);

        $item = Item_histories::create([
            'item_id' => $request->item_id,
            'price' => $request->price,
            'coef' => $request->coef,
        ]);
        return response()->json($item);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Item_histories  $comment
     * @return \Illuminate\Http\Response
     */
    public function show(Item_histories $item_histories)
    {
        return response()->json($item_histories);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Item_histories  $comment
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Item_histories $item_histories)
    {
        $this->validate($request, [
            'price' => 'required',
            'coef' => 'required',
        ]);

        $item_histories->update([
            'price' => $request->price,
            'coef' => $request->coef,

        ]);
        return response()->json($item_histories);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Item_histories  $comment
     * @return \Illuminate\Http\Response
     */
    public function destroy(Item_histories $item_histories)
    {
        $item_histories->delete();
        return response()->json("Item_histories deleted...");
    }
}
