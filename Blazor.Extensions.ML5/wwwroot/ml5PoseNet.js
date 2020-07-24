﻿let PoseNets = new Object();

function poseNetML5(hash, dotnet, video = null, options = null, type = null)
{
    let poseNet;
    if (video != null) {
        if (options != null) {
            poseNet = ml5.poseNet(video, options, poseNetModelLoad.bind(dotnet));
        }
        else if (type != null) {
            poseNet = ml5.poseNet(video, type, poseNetModelLoad.bind(dotnet));
        }
        else {
            poseNet = ml5.poseNet(video, poseNetModelLoad.bind(dotnet));
        }
    }
    else {
        if (options != null) {
            poseNet = ml5.poseNet(poseNetModelLoad.bind(dotnet), options);
        }
        else {
            poseNet = ml5.poseNet(poseNetModelLoad.bind(dotnet));
        }
    }
    PoseNets[hash] = poseNet;
}
function destroyPoseNetML5(hash) {
    delete PoseNets[hash];
}
function poseNetModelLoad() {
    this.invokeMethodAsync("PNFML", "__ModelLoadedPN__");
}

async function poseNetsinglePoseML5(hash, canvas) {
    var results = await PoseNets[hash].singlePose(canvas);
    console.log(results);
    return JSON.stringify(results);
}