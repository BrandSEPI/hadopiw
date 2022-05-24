<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Ressource;
use App\Models\Ressource_histories;
use Illuminate\Http\Request;

class RessourceController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $ressources = Ressource::all();
        return response()->json($ressources);
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
            'ressource_id' => 'required',
        ]);

        Ressource::where("ressource_id", $request->ressource_id)->delete();
        $ressource = Ressource::create([
            'ressource_id' => $request->ressource_id,
            'price' => $request->price,
        ]);

        Ressource_histories::create([
            'ressource_id' => $request->ressource_id,
            'price' => $request->price,
        ]);
        return response()->json($ressource);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Ressource  $comment
     * @return \Illuminate\Http\Response
     */
    public function show(Ressource $ressource)
    {
        return response()->json($ressource);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Ressource  $comment
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Ressource $ressource)
    {
        // var_dump($request->all());
        // var_dump($Ressource->id);
        $this->validate($request, [
            'price' => 'required',
        ]);

        $ressource->update([
            'price' => $request->price,

        ]);
        Ressource_histories::create([
            'ressource_id' => $ressource->id,
            'price' => $request->price,
            'coef' => $request->coef,
        ]);
        return response()->json($ressource);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Ressource  $comment
     * @return \Illuminate\Http\Response
     */
    public function destroy(Ressource $ressource)
    {
        $ressource->delete();
        return response()->json("Ressource deleted...");
    }
}
