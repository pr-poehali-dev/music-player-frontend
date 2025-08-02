import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Progress } from '@/components/ui/progress';
import Icon from '@/components/ui/icon';

interface Track {
  id: string;
  title: string;
  artist: string;
  album: string;
  duration: string;
  cover: string;
}

interface Playlist {
  id: string;
  name: string;
  tracks: Track[];
  cover: string;
}

const mockTracks: Track[] = [
  { id: '1', title: 'Midnight Dreams', artist: 'Cosmic Wave', album: 'Neon Nights', duration: '3:42', cover: '/img/8cf6e1b6-8189-4d32-9fa9-f7363396ed11.jpg' },
  { id: '2', title: 'Electric Pulse', artist: 'Synth Master', album: 'Digital Flow', duration: '4:15', cover: '/img/bf12ba65-331f-4812-8e31-89f1565e90e1.jpg' },
  { id: '3', title: 'Urban Nights', artist: 'Beat Collective', album: 'City Vibes', duration: '3:28', cover: '/img/f9d87c63-afce-4535-83c5-16fd9bd87827.jpg' },
  { id: '4', title: 'Neon Waves', artist: 'Future Sound', album: 'Synthwave Dreams', duration: '5:03', cover: '/img/8cf6e1b6-8189-4d32-9fa9-f7363396ed11.jpg' },
  { id: '5', title: 'Digital Rain', artist: 'Cyber Flow', album: 'Matrix', duration: '3:56', cover: '/img/bf12ba65-331f-4812-8e31-89f1565e90e1.jpg' },
];

const MusicApp = () => {
  const [currentTrack, setCurrentTrack] = useState<Track | null>(mockTracks[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playlists, setPlaylists] = useState<Playlist[]>([
    { id: 'liked', name: 'Любимые треки', tracks: mockTracks.slice(0, 3), cover: '/img/8cf6e1b6-8189-4d32-9fa9-f7363396ed11.jpg' },
    { id: 'chill', name: 'Chill Vibes', tracks: mockTracks.slice(1, 4), cover: '/img/bf12ba65-331f-4812-8e31-89f1565e90e1.jpg' },
  ]);
  const [selectedPlaylist, setSelectedPlaylist] = useState<string>('all');
  const [newPlaylistName, setNewPlaylistName] = useState('');
  const [volume, setVolume] = useState([75]);
  const [progress, setProgress] = useState(33);

  const displayTracks = selectedPlaylist === 'all' 
    ? mockTracks 
    : playlists.find(p => p.id === selectedPlaylist)?.tracks || [];

  const createPlaylist = () => {
    if (newPlaylistName.trim()) {
      const newPlaylist: Playlist = {
        id: Date.now().toString(),
        name: newPlaylistName,
        tracks: [],
        cover: '/img/f9d87c63-afce-4535-83c5-16fd9bd87827.jpg'
      };
      setPlaylists([...playlists, newPlaylist]);
      setNewPlaylistName('');
    }
  };

  const addToPlaylist = (playlistId: string, track: Track) => {
    setPlaylists(playlists.map(playlist => 
      playlist.id === playlistId 
        ? { ...playlist, tracks: [...playlist.tracks, track] }
        : playlist
    ));
  };

  return (
    <div className="h-screen bg-background text-foreground flex flex-col">
      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="w-64 bg-card border-r border-border p-4 flex flex-col">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-primary flex items-center gap-2">
              <Icon name="Music" size={28} />
              Музыка
            </h1>
          </div>

          <nav className="space-y-2 mb-6">
            <Button 
              variant={selectedPlaylist === 'all' ? 'default' : 'ghost'} 
              className="w-full justify-start"
              onClick={() => setSelectedPlaylist('all')}
            >
              <Icon name="Home" size={16} className="mr-2" />
              Вся музыка
            </Button>
          </nav>

          <div className="flex-1">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                Плейлисты
              </h3>
              <Button 
                size="sm" 
                variant="ghost"
                onClick={() => {
                  const name = prompt('Название плейлиста:');
                  if (name) {
                    setNewPlaylistName(name);
                    createPlaylist();
                  }
                }}
              >
                <Icon name="Plus" size={16} />
              </Button>
            </div>

            <div className="space-y-1">
              {playlists.map(playlist => (
                <Button
                  key={playlist.id}
                  variant={selectedPlaylist === playlist.id ? 'default' : 'ghost'}
                  className="w-full justify-start"
                  onClick={() => setSelectedPlaylist(playlist.id)}
                >
                  <Icon name="Music" size={16} className="mr-2" />
                  {playlist.name}
                  <span className="ml-auto text-xs text-muted-foreground">
                    {playlist.tracks.length}
                  </span>
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 p-6 overflow-y-auto">
          <div className="mb-6">
            <h2 className="text-3xl font-bold mb-2">
              {selectedPlaylist === 'all' 
                ? 'Вся музыка' 
                : playlists.find(p => p.id === selectedPlaylist)?.name}
            </h2>
            <p className="text-muted-foreground">
              {displayTracks.length} треков
            </p>
          </div>

          {/* Track List */}
          <div className="space-y-1">
            {displayTracks.map((track, index) => (
              <Card 
                key={track.id} 
                className="p-0 bg-card/50 hover:bg-card/80 transition-colors cursor-pointer"
                onClick={() => {
                  setCurrentTrack(track);
                  setIsPlaying(true);
                }}
              >
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-md overflow-hidden bg-muted flex-shrink-0">
                      <img 
                        src={track.cover} 
                        alt={track.album}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-foreground truncate">
                        {track.title}
                      </h4>
                      <p className="text-sm text-muted-foreground truncate">
                        {track.artist}
                      </p>
                    </div>

                    <div className="hidden md:block text-sm text-muted-foreground">
                      {track.album}
                    </div>

                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={(e) => {
                          e.stopPropagation();
                          const playlistId = prompt('Добавить в плейлист (ID):');
                          if (playlistId && playlists.find(p => p.id === playlistId)) {
                            addToPlaylist(playlistId, track);
                          }
                        }}
                      >
                        <Icon name="Plus" size={16} />
                      </Button>
                      <span className="text-sm text-muted-foreground w-12 text-right">
                        {track.duration}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Player */}
      {currentTrack && (
        <div className="h-24 bg-card border-t border-border px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Current Track Info */}
            <div className="flex items-center gap-4 flex-1">
              <div className="w-12 h-12 rounded-md overflow-hidden bg-muted">
                <img 
                  src={currentTrack.cover} 
                  alt={currentTrack.album}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="min-w-0">
                <h4 className="font-medium text-foreground truncate">
                  {currentTrack.title}
                </h4>
                <p className="text-sm text-muted-foreground truncate">
                  {currentTrack.artist}
                </p>
              </div>
              <Button size="sm" variant="ghost">
                <Icon name="Heart" size={16} />
              </Button>
            </div>

            {/* Player Controls */}
            <div className="flex flex-col items-center gap-2 flex-1 max-w-md">
              <div className="flex items-center gap-4">
                <Button size="sm" variant="ghost">
                  <Icon name="Shuffle" size={16} />
                </Button>
                <Button size="sm" variant="ghost">
                  <Icon name="SkipBack" size={16} />
                </Button>
                <Button 
                  size="default" 
                  className="rounded-full w-10 h-10"
                  onClick={() => setIsPlaying(!isPlaying)}
                >
                  <Icon name={isPlaying ? "Pause" : "Play"} size={20} />
                </Button>
                <Button size="sm" variant="ghost">
                  <Icon name="SkipForward" size={16} />
                </Button>
                <Button size="sm" variant="ghost">
                  <Icon name="Repeat" size={16} />
                </Button>
              </div>
              
              <div className="flex items-center gap-2 w-full">
                <span className="text-xs text-muted-foreground">1:23</span>
                <Progress value={progress} className="flex-1" />
                <span className="text-xs text-muted-foreground">{currentTrack.duration}</span>
              </div>
            </div>

            {/* Volume Controls */}
            <div className="flex items-center gap-2 flex-1 justify-end">
              <Icon name="Volume2" size={16} className="text-muted-foreground" />
              <Slider
                value={volume}
                onValueChange={setVolume}
                max={100}
                step={1}
                className="w-24"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MusicApp;