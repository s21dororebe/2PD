<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Category;

class CategoriesController extends Controller
{
    public function list()
    {
        $items = Category::orderBy('name', 'asc')->get();
        return view('category.list', ['title' => 'Kategorijas', 'items' => $items]);
    }
    public function create()
    {
        return view('category.form', ['title' => 'Pievienot kategoriju', 'category' => new Category()]);
    }
    public function put(Request $request)
    {
        $validatedData = $request->validate(['name' => 'required', 'description' => 'nullable']);
        $category = new Category();
        $category->name = $validatedData['name'];
        $category->description = $validatedData['description'];
        $category->save();
        return redirect('/categories');
    }

    public function update(Category $category)
    {
        return view('category.form', ['title' => 'Rediģēt kategoriju', 'category' => $category]);
    }

    public function patch(Category $category, Request $request)
    {
        $validatedData = $request->validate(['name' => 'required', 'description' => 'nullable']);
        $category->name = $validatedData['name'];
        $category->description = $validatedData['description'];
        $category->save();
        return redirect('/categories');
    }

    public function delete(Category $category)
    {
        $category->delete();
        return redirect('/categories');
    }

    public function __construct()
    {
        $this->middleware('auth');
    }
}


