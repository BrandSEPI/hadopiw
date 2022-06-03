<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Laravel\Sanctum\PersonalAccessToken;


class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $users = User::all();
        return response()->json($users);
    }

    public function store(Request $request)
    {
        $this->validate($request, [
            'username' => 'required|max:100',
            'email' => 'required|email|unique:users',
            'password' => 'required|min:8',
        ]);
        $user = User::create([
            'username' => $request->username,
            'email' => $request->email,
            'password' => bcrypt($request->password),
            'admin' => 0,

        ]);
        return response()->json($user);
    }

    public function show(User $user)
    {
        return response()->json($user);
    }


    public function update(Request $request, User $user)
    {
        $this->validate($request, [
            'username' => 'max:100',
            'email' => 'email|unique:users',
            'password' => 'min:8',
        ]);
        // $dbUsername = $user->username;
        // $dbEmail = $user->email;
        // $dbPassword = $user
        if ($request->username != "") {
            $user->update([
                "username" => $request->username,
            ]);
        };
        if ($request->email != "") {
            $user->update([
                "email" => $request->email,
            ]);
        };
        if ($request->password != "") {
            $user->update([
                "password" => bcrypt($request->password)
            ]);
        };
        if ($request->admin != "") {
            $user->update([
                "admin" => $request->admin,
            ]);
        };


        return response()->json($user);
    }


    public function destroy(User $user)
    {
        PersonalAccessToken::where('tokenable_id', $user->id)->delete();
        $user->delete();
        return response()->json("user deleted...");
    }

    public function login(Request $request)
    {
        $user = User::where('email', $request['email'])->firstOrFail();
        if (Hash::check($request->password, $user->password)) {
            $token = $user->createToken('auth_token')->plainTextToken;
            // $token = PersonalAccessToken::createToken();
        }

        return response()->json([
            'access_token' => $token,
            'user_id' => $user->id,
            'token_type' => 'Bearer',
        ]);
    }
    public function logout(Request $request)
    {
        // auth()->user()->tokens()->delete();
        $token = PersonalAccessToken::where('tokenable_id', $request['user_id']);
        $token->delete();
        return response()->json("token deleted...");
    }

    public function me(Request $request)
    {
        // $user_id = PersonalAccessToken::where('token', $request->header()['token'][0])->firstorfail()["tokenable_id"];
        $user = User::where("id", $request->header()['user-id'])->get();
        return $user;
    }
}
