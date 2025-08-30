<?php

namespace App\Http\Controllers\Vendor;

use App\Http\Controllers\Controller;
use Inertia\Response;
use Inertia\Inertia;

class VendorProductController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('vendor/product/vendor-product-index');
    }

    public function create(): Response 
    {
        return Inertia::render('vendor/product/vendor-product-create');
    }
}
