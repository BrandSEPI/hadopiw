<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Ressource_histories;
use Illuminate\Http\Request;

class RessourceHistoriesController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $ressourceId = $request->header()["ressource-id"][0];
        $ressource_histories = Ressource_histories::where('ressource_id', $ressourceId)->get();
        return response()->json($ressource_histories);
    }


    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $requestRessource
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $this->validate($request, [
            'ressource_id' => 'required',

        ]);

        $ressource = Ressource_histories::create([
            'ressource_id' => $request->ressource_id,
            'price' => $request->price,
            'coef' => $request->coef,
        ]);
        return response()->json($ressource);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Ressource_histories  $comment
     * @return \Illuminate\Http\Response
     */
    public function show(Ressource_histories $ressource_histories)
    {
        return response()->json($ressource_histories);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Ressource_histories  $comment
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Ressource_histories $ressource_histories)
    {
        $this->validate($request, [
            'price' => 'required',
            'coef' => 'required',
        ]);

        $ressource_histories->update([
            'price' => $request->price,
            'coef' => $request->coef,

        ]);
        return response()->json($ressource_histories);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Ressource_histories  $comment
     * @return \Illuminate\Http\Response
     */
    public function destroy(Ressource_histories $ressource_histories)
    {
        $ressource_histories->delete();
        return response()->json("Ressource_histories deleted...");
    }
}
