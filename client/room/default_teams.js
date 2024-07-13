// Библиотека, созданная как для команд РЕДАКТОР

import { Color } from 'pixel_combats/basic';
import { Teams } from 'pixel_combats/room';

export var RED_TEAM_NAME = "Red";
export var BLUE_TEAM_NAME = "Blue";
export var RED_TEAM_DISPLAY_NAME = "Teams/Red";
export var BLUE_TEAM_DISPLAY_NAME = "Teams/Blue";
export var BLUE_TEAM_SPAWN_POINTS_GROUP = 1;
export var RED_TEAM_SPAWN_POINTS_GROUP = 2;

export function create_team_red() {
    Teams.Add(RED_TEAM_NAME, RED_TEAM_DISPLAY_NAME, new Color(1, 0, 0, 0));
    Teams.Get(RED_TEAM_NAME).Spawns.SpawnPointsGroups.Add(RED_TEAM_SPAWN_POINTS_GROUP);
    return Teams.Get(RED_TEAM_NAME);
}

export function create_team_blue() {
    Teams.Add(BLUE_TEAM_NAME, BLUE_TEAM_DISPLAY_NAME, new Color(0, 0, 1, 0));
    Teams.Get(BLUE_TEAM_NAME).Spawns.SpawnPointsGroups.Add(BLUE_TEAM_SPAWN_POINTS_GROUP);
    return Teams.Get(BLUE_TEAM_NAME);
}
