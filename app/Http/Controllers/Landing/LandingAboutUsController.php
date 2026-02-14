<?php

namespace App\Http\Controllers\Landing;

use App\Http\Controllers\Controller;
use Inertia\Inertia;

class LandingAboutUsController extends Controller
{
    public function __invoke()
    {
        return Inertia::render('landings/about-us/about-us-index');
    }
}
