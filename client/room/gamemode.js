import { Build, BuildBlocksSet, Teams, Damage, BreackGraph, Ui, Spawns, Inventory } from 'pixel_combats/room';
import * as teams from './default_teams.js';

// Настройки, команд:
Damage.FriendlyFire = true;
BreackGraph.WeakBlocks = true;
BreackGraph.BreackAll = true;
Ui.GetContext().QuadsCount.Value = true;
Build.GetContext().BlocksSet.Value = BuildBlocksSet.AllClear;

// Строительные, свойства:
Build.GetContext().Pipette.Value = true;
Build.GetContext().FloodFill.Value = true;
Build.GetContext().FillQuad.Value = true;
Build.GetContext().RemoveQuad.Value = true;
Build.GetContext().BalkLenChange.Value = true;
Build.GetContext().FlyEnable.Value = true;
Build.GetContext().SetSkyEnable.Value = true;
Build.GetContext().GenMapEnable.Value = true;
Build.GetContext().ChangeCameraPointsEnable.Value = true;
Build.GetContext().QuadChangeEnable.Value = true;
Build.GetContext().BuildModeEnable.Value = true;
Build.GetContext().CollapseChangeEnable.Value = true;
Build.GetContext().RenameMapEnable.Value = true;
Build.GetContext().ChangeMapAuthorsEnable.Value = true;
Build.GetContext().LoadMapEnable.Value = true;
Build.GetContext().ChangeSpawnsEnable.Value = true;
Build.GetContext().BuildRangeEnable.Value = true;

// Создаём - команды:
if (red || !red && !blue) teams.create_team_red();
if (blue || !red && !blue) teams.create_team_blue();

// Командная, настройка:
Teams.OnRequestJoinTeam.Add(function(player,team){team.Add(player);});
Teams.OnPlayerChangeTeam.Add(function(player){ player.Spawns.Spawn(); });
Spawns.GetContext().RespawnTime.Value = 5;
Ui.GetContext().Hint.Value = "!Редактируйте, КАРТУ!";

// Инвентарь - сартировочный:
var Inventory = Inventory.GetContext();
Inventory.Main.Value = true;
Inventory.MainInfinity.Value = true;
Inventory.Secondary.Value = true;
Inventory.SecondaryInfinity.Value = true;
Inventory.Melee.Value = true;
Inventory.Explosive.Value = true;
Inventory.ExplosiveInfinity.Value = true;
Inventory.Build.Value = true;
Inventory.BuildInfinity.Value = true;
