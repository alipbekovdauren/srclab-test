<?php

namespace App\Http\Controllers;

use App\Models\Url;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Database\QueryException;
use Illuminate\Support\Facades\Validator;

class HomeController extends Controller
{
    public function index()
    {
        return view('index');
    }

    public function createUrl(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'original' => 'required|max:500'
        ]);

        if ($validator->fails()) {    
            return response()->json($validator->errors(), 422);
        }

        try {
            $alias = $this->generateAlias();
            
            $url = Url::create([
                'alias' => $alias,
                'original' => $request->original
            ]);
    
            return response()->json($url, 200);
        } catch (QueryException $e) {
            return response()->json($e, 500);
        }
    }

    public function redirectAlias($alias)
    {
        $url = Url::where('alias', $alias)->firstOrFail();

        return redirect()->away('http://' . $url->original);
    }

    public function generateAlias()
    {
        $alias = Str::random(5);

        while (Url::where('alias', $alias)->exists()) {
            $alias = Str::random(5);
        }

        return $alias;
    }
}
