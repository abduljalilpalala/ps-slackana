<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreProjectRequest;
use Illuminate\Http\Request;
use App\Models\Project;
use Spatie\MediaLibrary\MediaCollections\Models\Media;

class ProjectFileController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index($project)
    {
        try {
            $project = Project::findOrFail($project);
            return response()->json($project->getMedia('project-files'));
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }


    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreProjectRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreProjectRequest $request, $project)
    {
        try {
            $file = $request->file('file');
            $filename = $file->getClientOriginalName();
            $path = 'attachments-' . $project . '-' . $filename;
            $project = Project::findorFail($project);
            $project->addMediaFromRequest('file')
                ->usingFileName($path)
                ->toMediaCollection('project-files');
            return response()->json(['message' => 'File uploaded successfully'], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $project
     * @param  uuid  $file_uuid
     * @return \Illuminate\Http\Response
     */
    public function show($project, $file_uuid)
    {
        try {
            $project = Project::findOrFail($project);
            $media = Media::where('uuid', $file_uuid)->first();
            $json = [
                'uuid' => $media->uuid,
                'name' => $media->name,
                'original_url' => $media->getFullUrl(),
                'file_name' => $media->file_name,
                'extension' => $media->extension,
                'size' => $media->size
            ];

            return response()->json($json, 200);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}
