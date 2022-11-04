<?php

namespace App\Http\Controllers;

use App\Http\Resources\ProjectFileResource;
use Illuminate\Http\Request;
use App\Http\Requests\StoreProjectFileRequest;
use App\Models\Project;
use App\Utils\ProjectFileUtils;

class ProjectFileController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Resources\Json\AnonymousResourceCollection
     */
    public function index(Project $project)
    {
        return ProjectFileResource::collection($project->getMedia('project-files')->sortByDesc('created_at'));
    }


    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreProjectFileRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(StoreProjectFileRequest $request, Project $project)
    {
        // get all project related files
        $utils = new ProjectFileUtils();
        if ($request->hasFile('file')) {
            $mediaItems = $project->getMedia('project-files');
            //extract the name and remove the extension
            $name = explode('.', $request->file('file')->getClientOriginalName())[0];
            //check if the name already exists
            if ($mediaItems->contains('name', $name)) {
                //add suffix to the name
                $name = $utils->addSuffixToName($name, $project);
            }
            //add the file to the project
            $project->addMedia($request->file('file'))
                ->usingName($name)
                ->toMediaCollection('project-files');

            return response()->json(['message' => 'File uploaded successfully', 'name' => $name, 'collection' => $project->getMedia('project-files')], 200);
        }

        return response()->json(['message' => 'File upload failed'], 500);
    }



    /**
     * Display the specified resource.
     *
     * @param  Project  $project
     * @param  String  $file_uuid
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
     * @param  String  $file_uuid
     * @return \Illuminate\Http\JsonResponse 
     */
    public function update(Request $request, Project $project, $file_uuid)
    {
        $name = $request->name;
        $utils = new ProjectFileUtils();
        if ($project->getMedia('project-files')->contains('name', $name)) {
            //add suffix to the name
            $name = $utils->addSuffixToName($name, $project);
        }
        $media = $project->getMedia('project-files')->where('uuid', $file_uuid)->firstOrFail();
        $media->update([
            'name' => $name,
            'file_name' => $name . '.' . $media->extension
        ]);
        return response()->json(['message' => 'File updated successfully']);
    }


    /**
     * Remove the specified resource from storage.
     *
     * @param  Project  $project
     * @param  String  $file_uuid
     * @return \Illuminate\Http\JsonResponse 
     */
    public function destroy(Project $project, $file_uuid)
    {
        $project->getMedia('project-files')->where('uuid', $file_uuid)->firstOrFail()->delete();
        return response()->json([
            'message' => 'File deleted successfully',
        ]);
    }
}
