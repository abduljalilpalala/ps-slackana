<?php

namespace App\Http\Controllers;

use App\Http\Resources\ProjectFileResource;
use Illuminate\Http\Request;
use App\Http\Requests\StoreProjectFileRequest;
use App\Models\Project;

class ProjectFileController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Project $project)
    {
        return ProjectFileResource::collection($project->getMedia('project-files')->sortByDesc('created_at'));
    }


    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreProjectFileRequest $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreProjectFileRequest $request, Project $project)
    {
        if ($request->hasFile('file')) {
            $project->addMedia($request->file('file'))
                ->toMediaCollection('project-files');
            return response()->json(['message' => 'File uploaded successfully'], 200);
        }
        return response()->json(['message' => 'File upload failed'], 500);
    }

    /**
     * Display the specified resource.
     *
     * @param  Project  $project
     * @param  uuid  $file_uuid
     * @return \Illuminate\Http\Response
     */
    public function show(Project $project, $file_uuid)
    {
        return $project->getMedia('project-files')->where('uuid', $file_uuid)->firstOrFail();
    }



    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  Project  $project
     * @param  id  $file_uuid
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Project $project, $file_uuid)
    {
        $media = $project->getMedia('project-files')->where('uuid', $file_uuid)->firstOrFail();
        $media->update([
            'name' => $request->name,
            'file_name' => $request->name . '.' . $media->extension
        ]);
        return response()->json(['message' => 'File updated successfully']);
    }


    /**
     * Remove the specified resource from storage.
     *
     * @param  Project  $project
     * @param  id  $file_uuid
     * @return \Illuminate\Http\Response
     */
    public function destroy(Project $project, $file_uuid)
    {
        $project->getMedia('project-files')->where('uuid', $file_uuid)->firstOrFail()->delete();
        return response()->json([
            'message' => 'File deleted successfully',
        ]);
    }
}
