<?php

namespace App\Http\Controllers;

use Inertia\Response;
use Inertia\Inertia;

class ProductController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('vendor/product/vendor-product-index');
    }
}
