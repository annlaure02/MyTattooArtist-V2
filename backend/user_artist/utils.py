# function who will keep the user id to create the path for upload photos
def user_album_directory_path(instance, filename):
    return f'user_{instance.user_artist.id}/album/{filename}'

def user_flash_directory_path(instance, filename):
    return f'user_{instance.user_artist.id}/flash/{filename}'
