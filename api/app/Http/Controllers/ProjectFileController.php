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

        $mediaItems = $project->getMedia('project-files');

        if ($request->hasFile('file')) {
            $file_name = $request->file('file')->getClientOriginalName();

            // Check if file already exists, if exists, add a suffix to the file name
            if ($mediaItems->contains('file_name', $file_name)) {
                $file_name = $this->addSuffixToFileName($file_name, $mediaItems);
            }
            $project->addMediaFromRequest('file')->usingFileName($file_name)->toMediaCollection('project-files');

            return response()->json(['message' => 'File uploaded successfully', 'file_name' => $file_name], 200);
        }

        return response()->json(['message' => 'File upload failed'], 500);
    }

    private function addSuffixToFileName($file_name, $mediaItems)
    {
        $file_name_parts = explode('.', $file_name);
        $file_name = $file_name_parts[0] . ' (' . $mediaItems->count() . ')' . '.' .  $file_name_parts[1];

        return $file_name;
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


    private function countDuplicates($mediaItems, $file_name)
    {
        $count = 0;
        foreach ($mediaItems as $media) {
            //check if file name is the same
            if ($media->file_name == $file_name) {
                $count++;
            }
        }
        return $count;
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
