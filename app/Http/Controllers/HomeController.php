<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Inertia\Inertia;


class HomeController extends Controller
{
    public function __invoke()
    {
      return Inertia::render('landings/homepage/homepage-index', [
        'categories' => Category::where('active', 1)->select('name', 'slug')->get(),
      ]);
    }
}
