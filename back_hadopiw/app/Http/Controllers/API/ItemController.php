<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Item;
use App\Models\Item_histories;
use Illuminate\Http\Request;

class ItemController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $items = Item::all();
        return response()->json($items);
    }


    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $this->validate($request, [
            'item_id' => 'required',
        ]);

        Item::where("item_id", $request->item_id)->delete();
        $item = Item::create([
            'item_id' => $request->item_id,
            'price' => $request->price,
            'coef' => $request->coef,
        ]);

        Item_histories::create([
            'item_id' => $request->item_id,
            'price' => $request->price,
            'coef' => $request->coef,
        ]);
        return response()->json($item);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Item  $comment
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request)
    {

        $itemId = $request->header()["item-id"][0];
        $item = Item::where('item_id', $itemId)->get();
        return response()->json($item);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Item  $comment
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Item $item)
    {
        // var_dump($request->all());
        // var_dump($item->id);
        $this->validate($request, [
            'price' => 'required',
        ]);

        $item->update([
            'price' => $request->price,
            'coef' => $request->coef,

        ]);
        Item_histories::create([
            'item_id' => $item->id,
            'price' => $request->price,
            'coef' => $request->coef,
        ]);
        return response()->json($item);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Item  $comment
     * @return \Illuminate\Http\Response
     */
    public function destroy(Item $item)
    {
        $item->delete();
        return response()->json("item deleted...");
    }
}
