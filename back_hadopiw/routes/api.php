<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\ItemController;
use App\Http\Controllers\API\UserController;
use App\Http\Controllers\API\RessourceController;
use App\Http\Controllers\API\ItemHistoriesController;
use App\Http\Controllers\API\RessourceHistoriesController;


/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|false
*/

// Route::get('/test', function (Request $request) {
//     echo "test <br>";
//     return $request->user();
// });

// Route::middleware(['auth:sanctum'])->group(function () {
//     Route::apiResource("users", UserController::class);
//     Route::apiResource("posts", PostController::class);
//     Route::apiResource("comments", CommentController::class);
//     Route::apiResource("score", ScoreController::class);
//     Route::apiResource("favorite", FavoriteController::class);
//     Route::get('allPosts', [PostController::class, 'getAll']);
//     Route::get('allComments', [CommentController::class, 'getAll']);
//     Route::get('fav', [FavoriteController::class, 'getList']);
// });
// Route::get('userPosts', [PostController::class, 'getPostByUser']);
// Route::get('userComments', [CommentController::class, 'getCommentsOfUser']);
// Route::post('users', [UserController::class, 'store']);
// Route::get('users/{user}', [UserController::class, 'show']);
// Route::get('posts', [PostController::class, 'index']);
// Route::get('post/{post}', [PostController::class, 'show']);
// Route::get('comments', [CommentController::class, 'index']);
// Route::get('getScore', [ScoreController::class, 'getScore']);
Route::apiResource("items", ItemController::class);
Route::apiResource("itemHistory", ItemHistoriesController::class);
Route::apiResource("ressources", RessourceController::class);
Route::apiResource("ressourceHistory", RessourceHistoriesController::class);
Route::apiResource("users", UserController::class);
Route::post('login', [UserController::class, 'login']);
Route::post('logout', [UserController::class, 'logout']);
Route::get('me', [UserController::class, 'me']);
Route::get('display', [RessourceController::class, 'show']);
